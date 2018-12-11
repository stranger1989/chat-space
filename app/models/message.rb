class Message < ApplicationRecord
  mount_uploader :image, ImageUploader

  belongs_to :group
  belongs_to :user

  validates :body, presence: true
  validates :image, presence: true, unless: :image?
end
