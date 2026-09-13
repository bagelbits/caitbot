class Trick < ApplicationRecord
  self.table_name = "Trick"

  belongs_to :trick_type, class_name: "TrickType", foreign_key: "trickTypeId", inverse_of: :tricks, optional: true
  has_and_belongs_to_many :apparatuses,
                           join_table: "_ApparatusToTrick",
                           association_foreign_key: "A",
                           foreign_key: "B"

  validates :name, presence: true
  validates :description, presence: true

  def self.ransackable_associations(_auth_object = nil)
    [ "trick_type", "apparatuses" ]
  end
end
