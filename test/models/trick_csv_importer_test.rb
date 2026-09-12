require "test_helper"

class TrickCsvImporterTest < ActiveSupport::TestCase
  test "creates a trick and reuses existing trick types and apparatuses by name" do
    trampoline = Apparatus.create!(name: "Trampoline")
    twist = TrickType.create!(name: "Twist")

    csv = <<~CSV
      name,description,youtube_id,trick_type,apparatuses
      Half Twist,A single somersault with a half twist.,,twist,trampoline
    CSV

    result = TrickCsvImporter.new(StringIO.new(csv)).call

    assert_equal 1, result.created
    assert_empty result.errors

    trick = Trick.find_by!(name: "Half Twist")
    assert_equal twist, trick.trick_type
    assert_equal [ trampoline ], trick.apparatuses.to_a
  end

  test "creates trick types and apparatuses that don't exist yet" do
    csv = <<~CSV
      name,description,youtube_id,trick_type,apparatuses
      Layout,A straight-body somersault.,,Layout,Trampoline;Bars
    CSV

    assert_difference("TrickType.count" => 1, "Apparatus.count" => 2) do
      result = TrickCsvImporter.new(StringIO.new(csv)).call
      assert_equal 1, result.created
    end

    trick = Trick.find_by!(name: "Layout")
    assert_equal "Layout", trick.trick_type.name
    assert_equal [ "Bars", "Trampoline" ], trick.apparatuses.map(&:name).sort
  end

  test "reports an error for an invalid row without failing the rest of the import" do
    TrickType.create!(name: "Twist")

    csv = <<~CSV
      name,description,youtube_id,trick_type,apparatuses
      ,Missing a name.,,Twist,
      Half Twist,A single somersault with a half twist.,,Twist,
    CSV

    result = TrickCsvImporter.new(StringIO.new(csv)).call

    assert_equal 1, result.created
    assert_equal 1, result.errors.size
    assert_match(/Line 2/, result.errors.first)
  end

  test "returns an error result for malformed CSV instead of raising" do
    result = TrickCsvImporter.new(StringIO.new(%(name,description\n"unterminated))).call

    assert_equal 0, result.created
    assert_equal 1, result.errors.size
  end
end
