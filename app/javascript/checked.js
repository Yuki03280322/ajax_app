function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
     if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () => {
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;          
        }
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          // post.setAttribute("data-check", "false");
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);
/* 

1 checkメソッドを定義
?2HTMLファイルから.postのセレクター要素を全て取得しpostsへ代入(document.getElementsByClassName("post")でも可？)
セレクターとクラスの取得は違いはあるが、今は違いはあるという認識で問題ない
3 取得したposts要素の数だけ処理を繰り返す
4,5 もし、その要素の"data-load"属性の値がnullではなかった時nullを返り値にする
     "data-load"が定義されたものならどこで定義された？→8行目でsetされるので1回目はスルー
     return null;の時点で全ての動作を終了する
7 取得した要素の属性に"data-load"を設置し、その値にtrueを設定する
8 取得した要素をクリックした時、イベント発火
9 取得した要素から"data-id"の値を取得し、postIdに代入（この"data-id"はHTMLでカスタムデータとして"post"クラスに追加された属性で、値としてそれぞれの投稿のidが設定されている
9 これによりどの投稿をクリックしたか？を見分けた上で変数に代入している
10 ajax通信を成立させるために必要なXMLHttpRequestオブジェクトを生成することにより、XMLHttpRequestのメソッドやプロパティ、イベントを使えるようにし、見やすく変数に代入
11 openメソッドにより初期化した上で、リクエストの種類とアクセス先url、（通信の種類や、ユーザー名、パスワードの指定は省略可）を設定する
11 今回は情報の取得（VIEWでクリックされたという情報）の為、"GET"、パスはクリックされた要素（解釈は、変化させたい要素又はページをここで指定するでよい？）,非同期通信のため"true"
12 サーバーから受け取るレスポンスの形式に"json"を指定
13 サーバーへリクエストを送信
14 レスポンスを受け取った時の処理について
15 もし、HTTPステータスが200以外の時
17 alertメソッドで、該当のエラーメッセージを表示し、返り値を無にする
?19 レスポンスされたデータを変数itemに代入
(response.postとは具体的に、クリックされた要素の属性（id,check）の値（idカラムとcheckedカラムの値）を非同期で得た結果？このリクエストを明確に記されているのはどこ？)
↑ コントローラーから受け取った情報がrenderでpostとして受け取っている。ここでそれをさらに変数に入れている。
20 受け取ったidカラムとcheckedカラムの内、checkedカラムの値がtrueならば（既読ならば）
21 その投稿の"data-check"属性の値を"true"に設定する(CSS作動)
22 trueではなく、falseのとき、
?23 "data-check"属性を削除する setAttribute('data-check', "false")ではだめ？なぜ削除？
↑ CSSはtrueの時のみしか適用していないので、falseだとどうしたら良いかわからずエラーが出る（CSSの解除ができない）
29 checkメソッドを1秒に一度実行

"data-load"属性の存在意義
全体的にカスタムデータの"data-check"と、カラムの"checked"が混在していて使い分け方が分からない
↑ JavaScriptはあくまでHTML上の要素を指定し変化させる為、setAttribute等でitem.checkedのようにカラムを指定することができない
 */
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