class TrickType < ApplicationRecord
  self.table_name = "TrickType"

  has_many :tricks, foreign_key: "trickTypeId", inverse_of: :trick_type, dependent: :nullify

  validates :name, presence: true

  def self.ransackable_associations(_auth_object = nil)
    ["tricks"]
  end
end
