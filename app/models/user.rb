class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :groups, through: :members
  has_many :members
  has_many :messages

  validates :name, presence: true, length: { maximum: 6 }
end
