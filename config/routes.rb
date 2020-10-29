Rails.application.routes.draw do
  root to: 'posts#index'
  post 'posts', to: 'posts#create'
  #get 'posts', to: 'posts#checked'
  get 'posts/:id', to: 'posts#checked'
end

#4 どのメモを既読したいかを判断するための、メモのidを取得するためのルーティング
#4 今回のように渡す情報が一意の情報であればpathパラメーターの方が適する ?一意の情報とは