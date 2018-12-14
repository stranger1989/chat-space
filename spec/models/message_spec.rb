require 'rails_helper'

describe Message do
  describe '#create' do

    #bodyが空では登録できない
    it "is invalid without a body" do
      message = build(:message, body: nil)
      message.valid?
      expect(message.errors[:body]).to include("を入力してください")
    end

    #bodyが空では登録できない
    it "is invalid without a image" do
      binding.pry
      message = build(:message, image: nil)
      message.valid?
      expect(message.errors[:image]).to include("を入力してください")
    end

  end
end
