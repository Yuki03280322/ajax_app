function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      formText.value = "";
    };
    e.preventDefault();
  });
 }
 window.addEventListener("load", memo);
 




/*
(e) => {} 変数宣言？eって？

insertAdjacentHTML insertAdjacentHTMLは、指定したHTMLなどを、特定の要素に描画できるメソッド
要素.insertAdjacentHTML("afterend", HTML);
値	内容
beforebegin	要素の直前に挿入
afterend	要素の直後に挿入
afterbegin	内部の最初の子要素の前に挿入
beforeend	内部の最後の子要素の後に挿入
14 itemは、レスポンスとして返却されたメモのレコードデータを取得
15 listは、HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
16 formTextを取得する理由は、メモの入力フォームをリセットするため
16 リセット対象の要素であるcontentという要素を取得
17 メモとして描写する部分のHTMLを定義
26 list要素に対してHTMLを追加。afterendを指定し要素list直後に挿入
27 「メモの入力フォームに入力されたままの文字」はリセット。正確には、空の文字列に上書きされるような仕組み


*/