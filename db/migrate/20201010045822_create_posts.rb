class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.text :content #t.に続くのがカラムの型　シンボルで記載されたものがカラム名
      t.timestamps
    end
  end
end