import React, { useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import LorenzBox from './Kaos/LorenzBox';
import backgroundVideo from './video/tt5.mp4';
import LogisticBox from './Kaos/LogisticBox';
import VanDerPolBox from './Kaos/VanDerPolBox';
import IkedaBox from './Kaos/IkedaBox';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'rgba(255, 255, 255, 0.9)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
};

function App() {
  const [open, setOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);

  const handleOpen = (chart) => {
    setSelectedChart(chart);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedChart(null);
  };

  return (
    <div className="container">
      <div className="video-background">
        <video autoPlay loop muted className="video-bg">
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="text-area">
        Kaos teoremi, bazı deterministik sistemlerin uzun vadeli davranışlarının öngörülemez olduğunu belirten bir teoridir. Bu sistemler, başlangıç koşullarına son derece hassas olup, çok küçük değişiklikler bile zamanla büyük farklılıklara yol açabilir.
        <br /> <br />
        Kelebek etkisi, kaos teorisinin en ünlü örneklerinden biridir ve küçük değişikliklerin büyük sonuçlara yol açabileceği fikrini ifade eder. Lorenz, hava durumu modelleri üzerinde çalışırken, başlangıç koşullarındaki çok küçük bir değişikliğin hava durumu tahminlerinde büyük farklılıklara neden olabileceğini keşfetti. Bu, kaotik sistemlerin hassasiyetinin ve karmaşıklığının güzel bir örneğidir.
      </div>

      <div className="cards-container">
      <div className="card-row">
          <div className="card" onClick={() => handleOpen('logistic')}>
            Logistic
          </div>
          <div className="card" onClick={() => handleOpen('lorenz')}>
            Lorenz
          </div>
        </div>
        <div className="card-row">
          <div className="card" onClick={() => handleOpen('ikeda')}>
            Ikeda
          </div>
          <div className="card" onClick={() => handleOpen('vanDerPol')}>
            Van der Pol
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedChart === 'lorenz' && <LorenzBox />}
          {selectedChart === 'logistic' && <LogisticBox />}
          {selectedChart === "ikeda" && <IkedaBox u={0.9} limit={true} nlim={0} />}
          {selectedChart === "vanDerPol" && <VanDerPolBox />}
        </Box>
      </Modal>
    </div>
  );
}

export default App;