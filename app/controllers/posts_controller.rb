class PostsController < ApplicationController

  def index
    @posts = Post.all  # すべてのレコードを@postsに代入
  end
  
  def new
  end

  def create #contentというカラムにparams[:content]の情報を保存
    Post.create(content: params[:content]) #モデル.create(カラム名: 値)
  end #paramsという箱の中に格納されて送られてきたデータ(:content)
end
