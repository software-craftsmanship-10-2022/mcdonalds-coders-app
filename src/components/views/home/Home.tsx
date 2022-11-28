import {IMG_PATH} from '../../../config';
import HOME_LINKS from '../../../data/homeLinks';
import HOME_SLIDES from '../../../data/homeSlides';
import Carousel from '../../carousel/Carousel';
import './Home.css';

const Home = () => {
  return (
    <div className="Home">
      <Carousel items={HOME_SLIDES} />
      <div className="home-list">
        {HOME_LINKS.map((value, index) => (
          <div key={index} className="home-link">
            <p className="title">{value.title}</p>
            <a href={value.href}>
              <img src={IMG_PATH + value.img} alt="" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
