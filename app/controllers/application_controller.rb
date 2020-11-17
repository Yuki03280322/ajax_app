class ApplicationController < ActionController::Base
  before_action :basic_auth


  private

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == ENV["BASIC_AUTH_USER"] && password == ENV["BASIC_AUTH_PASSWORD"]
    end
  end
end

# 2 （全てのControllerでBasic認証を行うため）アクション起動前に定義

# 8 usernameとpasswordを使ったBasic認証を行う
# 9 usernameとpasswordは環境変数に代入しているためここでは表示されない
# $ vim ~/.bash_profile

# # .bash_profileを開いたら、「i」とタイプしてインサートモードに移行

# # .bash_profileの内部に次の記述を追加
# export BASIC_AUTH_USER='admin'
# export BASIC_AUTH_PASSWORD='2222'
# # 記述を追加したら、escキーを押してインサートモードを抜け、 「:wq」と入力して保存して終了する

# # .bash_profileを再読み込みし、定義した環境変数を有効にする
# $ source ~/.bash_profile