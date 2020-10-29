function check() {
  // 表示されているすべてのメモを取得している
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
     if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // メモをクリックした場合に実行する処理を定義している
    post.addEventListener("click", () => {
      // どのメモをクリックしたのか、カスタムデータを利用して取得している
      const postId = post.getAttribute("data-id");
      // Ajaxに必要なオブジェクトを生成している
      const XHR = new XMLHttpRequest();
      // openでリクエストを初期化する
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンスのタイプを指定、ブラウザからサーバへリクエストを送る際、情報を取得する場合はGETメソッド、情報を送信する場合はPOSTメソッドを利用
      XHR.responseType = "json";
      // sendでリクエストを送信する
      XHR.send();
      // レスポンスを受け取った時の処理を記述する
      XHR.onload = () => {
        if (XHR.status != 200) {
          // レスポンスの HTTP ステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // 処理を終了している
          return null;          
        }
        // レスポンスされたデータを変数itemに代入している
        const item = XHR.response.post;
        if (item.checked === true) {
          // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          // 未読状態であれば、カスタムデータを削除している
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);




/*
4-6 1回目 イベント発火が起きている要素にdata-load = "true"はまだ追加されていないため、
          if文の処理は読み込まれずに、7行目に処理が移る
7 1回目 post.setAttribute("data-load", "true");と記述することで、要素にdata-load = "true"と属性を追加
3-6 2回目イベント発火が起きている要素にdata-load = "true"が追加されているため、
    post.getAttribute("data-load") != nullの空ではない条件に当てはまり、if文の処理が読み込まれる。
    その結果、返り値としてreturn null;が返ってきて、処理が止まる流れ
7 2回目 4~6行目で処理が終わるので、読み込まれず
? (){}は何を意味する？
↑()は無名関数、{}にはプロパティやメソッドの中身
checkはDOMの取得からエンドポイントへのリクエストなどはすべてcheckで記述
? window(ページ)を読み込んだ時に、エンドポイントへのリクエストが送られる？
postsセレクターの要素1つずつにクリックした歳に動作する処理を記述
? 4 ("click", () => {は、無名関数とアロー関数（functionの省略）、なぜアロー関数が必要？
5 post要素のdata-id属性の戻り値を取得し、定数postIdに代入（メモのidを取得）
6 オブジェクトを生成し、定数XHRから、XMLHttpRequestメソッドを使用できる
7 GETアクションの/posts/${postId}パスへ非同期通信のAjax方式でリクエストを送信する。→JSON形式でレスポンスを貰うため？
記述場所	目的	以降で使用する際の記述
第一引数	HTTPメソッドの指定	GET
第二引数	パスの指定	/posts/${postId}
第三引数	非同期通信のON/OFF	true
8 レスポンスの形式にjsonを指定（XHRHttpRequestで定義されているメソッド＝responseType)
10 レスポンスの受信に成功した場合について定義
? 11 レスポンスで受け取った投稿情報を定数itemに格納
? 12 もしその投稿が既読であることが本当の場合
? 13 その投稿のdata-check属性にtrueを追加
? 14 もしその投稿が既読ではなかった場合
? 15 その投稿のdata-check属性を削除


ステータスコード	内容
100~	処理の継続中
200~	処理の成功
300~	リダイレクト
400~	クライアントのエラー
500~	サーバーのエラー
*/