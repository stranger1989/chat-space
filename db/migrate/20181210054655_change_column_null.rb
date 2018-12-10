class ChangeColumnNull < ActiveRecord::Migration[5.0]
  def up
    change_column_null :members, :group_id, true
    change_column_null :members, :user_id, true
  end

  def down
    change_column_null :members, :group_id, false
    change_column_null :members, :user_id, false
  end
end
