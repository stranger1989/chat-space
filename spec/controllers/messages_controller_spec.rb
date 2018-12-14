require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }
  # let(:message) { create(:message) }

  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context 'log in' do
      before do
        login user
      end

      context 'can save' do
        subject {
          post :create,
          params: params
        }

        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)
        end

        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, body: nil, image: nil) } }
        subject {
          post :create,
          params: invalid_params
        }

        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
        end

        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'not log in' do

      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end

  end
end

  # let(:group) { create(:group) }
  # let(:user) { create(:user) }

  # describe '#index' do

  #   context 'log in' do
  #     before do
  #       login user
  #       get :index, params: { group_id: group.id }
  #     end

  #     it 'assigns @message' do
  #       expect(assigns(:message)).to be_a_new(Message)
  #     end

  #     it 'assigns @group' do
  #       expect(assigns(:group_now)).to eq group
  #     end

  #     it 'redners index' do
  #       expect(response).to render_template :index
  #     end
  #   end

  #   context 'not log in' do
  #     before do
  #       get :index, params: { group_id: group.id }
  #     end

  #     it 'redirects to new_user_session_path' do
  #       expect(response).to redirect_to(new_user_session_path)
  #     end
  #   end
  # end

  # describe 'GET #edit' do
  #   it "assigns the requested tweet to @tweet" do
  #     tweet = create(:tweet)
  #     get :edit, params: { id: tweet }
  #     expect(assigns(:tweet)).to eq tweet
  #   end

  #   it "renders the :edit template" do
  #     tweet = create(:tweet)
  #     get :edit, params: { id: tweet }
  #     expect(response).to render_template :edit
  #   end
  # end

  # describe 'GET #index' do
  #   it "populates an array of tweets ordered by created_at DESC" do
  #     tweets = create_list(:tweet, 3)
  #     get :index
  #     expect(assigns(:tweets)).to match(tweets.sort{ |a, b| b.created_at <=> a.created_at } )
  #   end

  #   it "renders the :index template" do
  #     get :index
  #     expect(response).to render_template :index
  #   end
  # end
