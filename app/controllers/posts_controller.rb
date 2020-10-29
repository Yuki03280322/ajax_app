class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")  # すべてのレコードを@postsに代入
  end

  def create #contentというカラムにparams[:content]の情報を保存
    Post.create(content: params[:content]) #モデル.create(カラム名: 値)
    redirect_to action: :index
  end #paramsという箱の中に格納されて送られてきたデータ(:content)

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

#13 URLパラメーターから既読したメモのidが渡されるように設定するためそのidを使用して該当するレコードを取得
#14 その投稿は既読ですか？
#15 既読であれば既読を解除するためにfalseへ変更
#17 既読でなかれば既読にするためにtrueへ変更
#20 更新したレコードをitemへ格納
#21 renderメソッドで返却するファイルを指定（データを返却する場合はjson）し、{ post: item }というデータをjson形式で返却する。返却先はchecked.js。
#21 返却する対象が、viewファイルならHTML、データならjsonが主流
#21 render json: @tweetsでそのアクションが呼び出された時@tweetsの値をjson形式で出力