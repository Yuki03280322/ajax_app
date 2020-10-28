Rails.application.routes.draw do#ここからルーティングを開始します
  get 'posts', to: 'posts#index'#[HTTPメソッド] '[URIパターン]', to: '[コントローラー名]#[アクション名]'postsControllerの中にあるindexファイルを開きます
end #to:に続くのはリクエストに対応する処理を表す
