import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500&family=Noto+Sans+KR:wght@300;400;500&display=swap');
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
