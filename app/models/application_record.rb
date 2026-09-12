class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  # Primary keys are app-generated strings (originally Prisma cuids); there's
  # no DB-side default, so every string-PK model needs one on insert.
  before_create { self.id ||= SecureRandom.uuid if self.class.columns_hash["id"]&.type == :string }

  # No sensitive columns on any model here, so ActiveAdmin/Ransack can search and sort on all of them.
  def self.ransackable_attributes(_auth_object = nil)
    column_names
  end
end
