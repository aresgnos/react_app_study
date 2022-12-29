import "./App.css";
// state 사용
import {useState} from 'react';

// 컴포넌트 만들기
function Header(props) {
  console.log('props', props.title);
  return <header>
    <h1>
      <a href="/" onClick={(event) => {
        // 페이지 reload 방지
        event.preventDefault();
        // 함수 실행
        props.onChangeMode();
      }}>{props.title}</a>
    </h1>
  </header>;
}
function Nav(props) {
  const lis = [
  ]
  // topic의 원소의 숫자만큼 반복
  for(let i=0; i<props.topics.length; i++) {
    let t = props.topics[i];
    // console.log('t', t);
    // 숫자를 태그의 속성으로 넘기면 문자가 된다.
    lis.push(<li key={t.id}><a id={t.id} href={'/read/'+t.id} onClick={(event) => {
      event.preventDefault();
      // props.onChangeMode(t.id);
      props.onChangeMode(Number(event.target.id));
    }}>{t.title}</a></li>)

  }
  return <nav>
  <ol>
    {lis}
  </ol>
</nav>
}
function Article(props) {
  console.log('props', props);
  return <article>
  <h2>{props.title}</h2>
  {props.body}
</article>
}
function App() {
  // 지역변수
  // const mode = 'WELCOME';

  // state, 상태로 만듦
  // useState는 배열을 리턴
  // 0번째 원소 = 상태의 값을 읽을 때 쓰는 데이터
  // 1번째 원소 = 상태의 값을 변경할 때 사용하는 함수
  // const _mode = useState('WELCOME');
  // console.log("_mode", _mode);
  // const mode = _mode[0]; // 상태의 값을 읽을 수 있다. (state의 값)
  // const setMode = _mode[1]; // 상태의 값을 바꿀 수 있다. (state를 바꿀 때)
  // mode, setMode의 이름은 자유
  const [mode, setMode] = useState('WELCOME'); // 상단과 같음

  // 어떤 글을 선택했는지 state로 만듦
  // 선택된게 없으므로 초기값이 없다고 지정
  const [id, setId] = useState(null);

  const topics = [
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'js', body:'js is...'},
  ]
  // 초기값
  let content = null;
  if(mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ') {
    let title, body = null;
    // topics의 값중에 우리가 선택한 id와 일치하는 원소를 찾아서 바꿔준다.
    for(let i=0; i<topics.length; i++) {
      console.log(topics[i].id, id);
      if(topics[i].id === id) { // topics[i].id와 state의 id가 일치하면
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={() => {
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
    </div>
  );
}

export default App;
