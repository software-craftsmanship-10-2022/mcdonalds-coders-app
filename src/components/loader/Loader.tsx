import './Loader.css';

type LoaderProps = {
  fullScreen?: boolean;
  color?: string;
  text?: string;
};

const Loader = ({fullScreen = false, color = '--mc-yellow', text = 'loading ...'}: LoaderProps) => (
  <div className={fullScreen ? 'Loader fullScreen' : 'Loader'}>
    <div className="ringWrapper">
      <div
        className="innerRing"
        style={{borderColor: `var(${color}) transparent var(${color}) transparent`}}
      ></div>
    </div>
    <p> {text}</p>
  </div>
);

export default Loader;
