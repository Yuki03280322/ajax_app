class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")  # すべてのレコードを@postsに代入
  end

  def create 
    post = Post.create(content: params[:content], checked: false)
    render json:{ post:post }
  end 

  def checked
    post = Post.find(params[:id])
    if post.checked
      post.update(checked: false)
    else
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    render json: { post: item }
  end
end

# 4 ポストmodelのレコードを全て取得し降順で並び替え
#? 8 投稿を保存する時、入力された情報(:content)はcheckedアクションをfalse（未読）にして保存する(checkedカラムがboolean型だから可能)
# ↑ Post.create(post_params,checked: falseではなぜダメ？)
# contentカラムに入力された情報を保存したい（ストロングパラメーターを使うのはセキュリティの観点から）
#9 Ajax実現のため{ post:post }というデータをJSON方式にして返却してもらう
#? ↑ post:postというデータとは何？返却はデータベースから？
# ↑ render同様右はコントローラーで定義した変数を、左の変数に入れてviewにもっていく
#13 URLパラメーターから既読したメモのidが渡されるように設定するためそのidを使用して該当するレコードを取得
#14 その投稿は既読(true)ですか？
#15 既読であれば既読を解除するためにfalseへ変更
#17 既読でなかれば既読にするためにtrueへ変更
#20 更新したレコードをitemへ格納
#21 renderメソッドで返却するファイルを指定（データを返却する場合はjson）し、{ post: item }というデータをjson形式で返却する。返却先はchecked.js。
#21 返却する対象が、viewファイルならHTML、データならjsonが主流
#21 render json: @tweetsでそのアクションが呼び出された時@tweetsの値をjson形式で出力
#sequel proでcheckedカラムのレコードがnullとゼロなのはなぜ？trueとfalseではないのか？→0が未読、1が既読


