require 'rails_helper'

describe Group do
  describe '#create' do
    #nameが空では登録できない
    it "is invalid without a name" do
      group = build(:group, name: nil)
      group.valid?
      expect(group.errors[:name]).to include("を入力してください")
    end
    #idsが空では登録できない
    it "is invalid without a name" do
      group = build(:group, user_ids: nil)
      group.valid?
      expect(group.errors[:user_ids]).to include("を入力してください")
    end

  end
end
