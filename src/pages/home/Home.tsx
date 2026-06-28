import Header from "../../components/header/Header"
import Hero from "../../components/hero/Hero"
import Resource from "../../components/resource/Resource"
import Footer from "../../components/footer/Footer"
import './Home.css'
import FeatureCards from "../../components/featureCard/FeatureCards"

const Home = () => {
  return (
    <div className="home-section">
        <Header/>
        <Hero/>
        <div className="home-card-section">
            <Resource/>
            <FeatureCards/>
        </div>
        <Footer/>
    </div>
  )
}

export default Home