class Apparatus < ApplicationRecord
  self.table_name = "Apparatus"

  has_and_belongs_to_many :tricks,
                           join_table: "_ApparatusToTrick",
                           association_foreign_key: "B",
                           foreign_key: "A"

  validates :name, presence: true

  def self.ransackable_associations(_auth_object = nil)
    [ "tricks" ]
  end
end
