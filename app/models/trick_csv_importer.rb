require "csv"

class TrickCsvImporter
  Result = Struct.new(:created, :errors)

  # Expected headers: name, description, youtube_id (optional),
  # trick_type, apparatuses (optional, ";"-separated names).
  # Trick types and apparatuses are matched by name (case-insensitive)
  # and created if they don't exist yet, so a CSV can introduce new ones.
  def initialize(file)
    @file = file
  end

  def call
    rows = CSV.parse(@file.read, headers: true, header_converters: :symbol)
    errors = []
    created = 0

    rows.each.with_index(2) do |row, line_number|
      trick = build_trick(row)
      if trick.save
        created += 1
      else
        errors << "Line #{line_number}: #{trick.errors.full_messages.join(', ')}"
      end
    rescue => e
      errors << "Line #{line_number}: #{e.message}"
    end

    Result.new(created, errors)
  rescue CSV::MalformedCSVError => e
    Result.new(0, [ "Could not parse CSV: #{e.message}" ])
  end

  private

  def build_trick(row)
    Trick.new(
      name: row[:name],
      description: row[:description],
      youtubeId: row[:youtube_id].presence,
      trick_type: find_or_create_trick_type(row[:trick_type]),
      apparatuses: find_or_create_apparatuses(row[:apparatuses])
    )
  end

  def find_or_create_trick_type(name)
    return nil if name.blank?

    TrickType.where("lower(name) = ?", name.strip.downcase).first ||
      TrickType.create!(name: name.strip)
  end

  def find_or_create_apparatuses(names)
    return [] if names.blank?

    names.split(";").map(&:strip).reject(&:blank?).map do |name|
      Apparatus.where("lower(name) = ?", name.downcase).first ||
        Apparatus.create!(name: name)
    end
  end
end
