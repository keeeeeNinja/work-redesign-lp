Every Layout

🧠 Every Layout の核となる考え方
1. Intrinsic Design（本質的デザイン）

コンテンツのサイズがレイアウトを決めるべき。
逆に「レイアウトがコンテンツを歪める」べきではない。

2. Algorithmic Layout（アルゴリズムレイアウト）

ブラウザの計算に任せる。
例：

flex-wrap: wrap; に任せれば勝手に折り返す

minmax() と auto-fit/auto-fill を使えばいい感じにグリッドが並ぶ

max-width で読みやすい行幅を確保できる

3. マジックナンバー（固定値）を避ける

“とりあえず padding: 37px;” のように、
根拠のない数値を置かない。

代わりに

gap

min-width

minmax()

aspect-ratio

auto
などで“自動調整”させる。

4. 不要なメディアクエリは書かない

「このレイアウトはスマホでは縦、PCでは横…」
→ Flexbox を使えば幅によって勝手に折り返す。

「カードは2列・3列で…」
→ Grid の auto-fit で勝手に変わる。

「テキスト幅は768px以上なら最大800px」
→ max-width: 65ch（読みやすい文字数）で端末に依存しない。

🧩 Every Layout の代表的コンポーネント例
1. Stack（縦積み）

要素同士の間隔を決めるだけのコンポーネント。
メディアクエリ不要。
.stack > * + * {
    margin-top: var(--space, 1rem);
}

.stack > * + * {
    margin-top: var(--space, 1rem);
}

2. Center（中央寄せ）

margin-inline: auto で中央揃え。
幅はコンテンツ量に応じて変わる。

3. Cluster（アイテムを柔軟に並べる）

ナビゲーション・タグなど。

.cluster {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space, 1rem);
}

幅が狭ければ勝手に折返す＝メディアクエリ不要。

4. Sidebar（左右コンテンツ）

「左にテキスト、右に画像」
→ 必要なら画像が下に落ちるようにする。

.sidebar {
    display: flex;
    gap: 1rem;
}

.sidebar > :first-child {
    flex-basis: 20rem; /* 最低これぐらい欲しい */
    flex-grow: 1;
}

幅が足りないと自動的に縦並びに。