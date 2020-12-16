import React, { Component } from 'react'
import PhotoSlider from '../Component/PhotoSlider/PhotoSlider'
import Footer from "../Component/Footer/Footer"
import "../Assets/Css/LandingPage.css";
import Button from 'react-bootstrap/Button'

export class LandingPage extends Component {
    render() {
        return (
            <div >
                <PhotoSlider />
                <h1 style={{ padding: "40px", fontWeight: "bold", fontSize: "35px" }}>Our Mission</h1>
                <p style={{ paddingLeft: "60px", paddingRight: "60px" }}>
                    Lorem ipsum dolor sit amet, eu has malis partem aliquam, mutat everti ex qui. Vix erroribus sadipscing in, natum perpetua splendide id nec. Has in solum senserit, cum cu molestiae intellegat. Te expetendis adversarium has, ei vis ferri dicat viderer. Cu legendos reprehendunt ius. Te iusto causae sapientem eam, et graecis epicuri principes has. Invidunt erroribus sea et, dicit legimus cu pro. Vis et voluptaria honestatis scriptorem, his ad nominavi inimicus volutpat. Eam ne vide feugiat, cum omnes minimum vivendum ut, dicta ridens consequuntur quo an. Ex soleat noster tractatos quo. Id iriure assentior disputando vix, no his nibh patrioque, feugait pertinacia qui no. Eros ancillae eam te. Ei nibh rebum imperdiet mei, ne qui tale dicat omnium. Ne prompta molestiae his, recusabo maiestatis mea ex. Quot dictas moderatius his cu.</p>
                <div className="row">
                    <div className="column" >
                        <h2>About us</h2>
                        <p style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                            Lorem ipsum dolor sit amet, eu has malis partem aliquam, mutat everti ex qui.
                            Vix erroribus sadipscing in, natum perpetua splendide id nec. Has in solum
                            senserit, cum cu molestiae intellegat. Te expetendis adversarium has, ei vis
                            ferri dicat viderer. Cu legendos reprehendunt ius. Te iusto causae sapientem eam,
                            et graecis epicuri principes has. Invidunt erroribus sea et, dicit legimus cu pro.
                            Vis et voluptaria honestatis scriptorem, his ad nominavi inimicus volutpat.
                            Eam ne vide feugiat, cum omnes minimum vivendum ut, dicta ridens consequuntur
                            quo an. Ex soleat noster tractatos quo. Id iriure assentior disputando vix,
                            no his nibh patrioque, feugait pertinacia qui no. Eros ancillae eam te.
                            Ei nibh rebum imperdiet mei, ne qui tale dicat omnium. Ne prompta molestiae his,
                            recusabo maiestatis mea ex. Quot dictas moderatius his cu.
                        </p>
                        <Button className="button" href="/" variant="info">Learn More</Button>
                    </div>
                    <div className="column" >
                        <h2>Pet Gallery</h2>
                        <p style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                            Lorem ipsum dolor sit amet, eu has malis partem aliquam, mutat everti ex qui.
                            Vix erroribus sadipscing in, natum perpetua splendide id nec. Has in solum
                            senserit, cum cu molestiae intellegat. Te expetendis adversarium has, ei vis
                            ferri dicat viderer. Cu legendos reprehendunt ius. Te iusto causae sapientem eam,
                            et graecis epicuri principes has. Invidunt erroribus sea et, dicit legimus cu pro.
                            Vis et voluptaria honestatis scriptorem, his ad nominavi inimicus volutpat.
                            Eam ne vide feugiat, cum omnes minimum vivendum ut, dicta ridens consequuntur
                            quo an. Ex soleat noster tractatos quo. Id iriure assentior disputando vix,
                            no his nibh patrioque, feugait pertinacia qui no. Eros ancillae eam te.
                            Ei nibh rebum imperdiet mei, ne qui tale dicat omnium. Ne prompta molestiae his,
                            recusabo maiestatis mea ex. Quot dictas moderatius his cu.
                        </p>
                        <Button className="button" href="/petGallery" variant="info">Learn More</Button>
                    </div>
                    <div className="column" >
                        <h2>How To</h2>
                        <p style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                            Lorem ipsum dolor sit amet, eu has malis partem aliquam, mutat everti ex qui.
                            Vix erroribus sadipscing in, natum perpetua splendide id nec. Has in solum
                            senserit, cum cu molestiae intellegat. Te expetendis adversarium has, ei vis
                            ferri dicat viderer. Cu legendos reprehendunt ius. Te iusto causae sapientem eam,
                            et graecis epicuri principes has. Invidunt erroribus sea et, dicit legimus cu pro.
                            Vis et voluptaria honestatis scriptorem, his ad nominavi inimicus volutpat.
                            Eam ne vide feugiat, cum omnes minimum vivendum ut, dicta ridens consequuntur
                            quo an. Ex soleat noster tractatos quo. Id iriure assentior disputando vix,
                            no his nibh patrioque, feugait pertinacia qui no. Eros ancillae eam te.
                            Ei nibh rebum imperdiet mei, ne qui tale dicat omnium. Ne prompta molestiae his,
                            recusabo maiestatis mea ex. Quot dictas moderatius his cu.
                        </p>
                        <Button className="button" href="/" variant="info">Learn More</Button>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default LandingPage
