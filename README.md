# DB設計

## userテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, primary_key: true|
|name|varchar(255)|null: false, index: true|
|email|varchar(255)|null: false, unique_key: true|
|password|varchar(255)|null: false|
|created_at|datetime|null: false|
|updated_at|datetime|null: false|

### Association
- has_many :groups, through: :members
- has_many :members
- has_many :messages

***

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, primary_key: true|
|name|varchar(255)|null: false|
|created_at|datetime|null: false|
|updated_at|datetime|null: false|

### Association
- has_many :users, through: :members
- has_many :members
- has_many :messages

***

## memberテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, primary_key: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

***

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, primary_key: true|
|body|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|created_at|datetime|null: false|
|updated_at|datetime|null: false|

### Association
- belongs_to :group
- belongs_to :user
