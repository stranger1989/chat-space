require 'rails_helper'

describe User do
  describe '#create' do

    #nameが空では登録できない
    it "is invalid without a name" do
      user = build(:user, name: nil)
      user.valid?
      expect(user.errors[:name]).to include("を入力してください")
    end

    #emailが空では登録できない
    it "is invalid without a email" do
      user = build(:user, email: nil)
      user.valid?
      expect(user.errors[:email]).to include("を入力してください")
    end

    #passwordが空では登録できない
    it "is invalid without a password" do
      user = build(:user, password: nil)
      user.valid?
      expect(user.errors[:password]).to include("を入力してください")
    end

    #nameとemail、passwordとpassword_confirmationが存在すれば登録できること
    it "is valid with a name, email, password, password_confirmation" do
      user = build(:user)
      expect(user).to be_valid
    end

    #重複したemailが存在する場合登録できないこと
    it "is invalid with a duplicate email address" do
      user = create(:user)

      another_user = build(:user)
      another_user.valid?
      expect(another_user.errors[:email]).to include("はすでに存在します")
    end

    #nameが7文字以上であれば登録できないこと
    it "is invalid with a over 7 character as name" do
      user = build(:user, name: "aaaaaaa")
      user.valid?
      expect(user.errors[:name][0]).to include("は6文字以内で入力してください")
    end

    #nameが6文字以下であれば登録できること
    it "is valid with a under 6 character as nickname" do
      user = build(:user, name: "aaaaaa")
      user.valid?
      expect(user).to be_valid
    end

    #passwordが6文字以上であれば登録できること
    it "is valid with a over 6 character as password" do
      user = build(:user, password: "000000", password_confirmation: "000000" )
      user.valid?
      expect(user).to be_valid
    end

    #passwordが5文字以下であれば登録できないこと
    it "is invalid with a under 5 character as password" do
      user = build(:user, password: "00000")
      user.valid?
      expect(user.errors[:password][0]).to include("は6文字以上で入力してください")
    end

  end
end
