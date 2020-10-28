class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")  # すべてのレコードを@postsに代入
  end

  def create #contentというカラムにparams[:content]の情報を保存
    Post.create(content: params[:content]) #モデル.create(カラム名: 値)
    redirect_to action: :index
  end #paramsという箱の中に格納されて送られてきたデータ(:content)
end
