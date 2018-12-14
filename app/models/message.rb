class Message < ApplicationRecord
  mount_uploader :image, ImageUploader

  belongs_to :group
  belongs_to :user

  validates :body_or_image, presence: true

  private
    def body_or_image
      body.presence or image.presence
    end
end
