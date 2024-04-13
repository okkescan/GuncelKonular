import React, { useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CalculateIcon from '@mui/icons-material/Calculate';
import Stack from '@mui/material/Stack';
import { Lorenz } from './lorenz';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500, 
  height: 500, 
  bgcolor: 'rgba(255, 255, 255, 0.9)', 
  border: '2px solid #000',
  boxShadow: 24,
  p: 4, 
  display: 'flex',
  flexDirection: 'column',
};


function App() {
  const [open, setOpen] = useState(false); 

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="text-area">
            Kaos teoremi, bazı deterministik sistemlerin uzun vadeli davranışlarının öngörülemez olduğunu belirten bir teoridir. Bu sistemler, başlangıç koşullarına son derece hassas olup, çok küçük değişiklikler bile zamanla büyük farklılıklara yol açabilir.
            <br /> <br />
            Kelebek etkisi, kaos teorisinin en ünlü örneklerinden biridir ve küçük değişikliklerin büyük sonuçlara yol açabileceği fikrini ifade eder. Lorenz, hava durumu modelleri üzerinde çalışırken, başlangıç koşullarındaki çok küçük bir değişikliğin hava durumu tahminlerinde büyük farklılıklara neden olabileceğini keşfetti. Bu, kaotik sistemlerin hassasiyetinin ve karmaşıklığının güzel bir örneğidir.
          </div>
        </div>

        <div className="col">
        </div>

        <div className="col">
          <div className="card card1" onClick={() => setOpen(true)}>
            <div className="text">lorenz</div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={{
          ...style,
          backgroundImage: 'url(images/kaos.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          hight: '700px',

        }}
      >
                      <Lorenz></Lorenz>
                 


          
{/*<TextField*/}
{/*  id="outlined-number-1"*/}
{/*  label="Number"*/}
{/*  type="number"*/}
{/*  size="small"*/}
{/*  InputLabelProps={{*/}
{/*    shrink: true,*/}
{/*  }}*/}
{/*  sx={{ */}
{/*    marginBottom: 2, */}
{/*    width: '150px', */}
{/*    '.MuiInputBase-input': { */}
{/*      fontSize: '0.875rem', */}
{/*    }*/}
{/*  }}*/}
{/*/>*/}

{/*<TextField*/}
{/*  id="outlined-number-1"*/}
{/*  label="Number"*/}
{/*  type="number"*/}
{/*  size="small"*/}
{/*  InputLabelProps={{*/}
{/*    shrink: true,*/}
{/*  }}*/}
{/*  sx={{ */}
{/*    marginBottom: 2, */}
{/*    width: '150px', */}
{/*    '.MuiInputBase-input': { */}
{/*      fontSize: '0.875rem',*/}
{/*    }*/}
{/*  }}/>*/}
{/*          <TextField*/}
{/*  id="outlined-number-1"*/}
{/*  label="Number"*/}
{/*  type="number"*/}
{/*  size="small"*/}
{/*  InputLabelProps={{*/}
{/*    shrink: true,*/}
{/*  }}*/}
{/*  sx={{ */}
{/*    marginBottom: 2, */}
{/*    width: '150px', */}
{/*    '.MuiInputBase-input': { */}
{/*      fontSize: '0.875rem', */}
{/*    }*/}
{/*  }}*/}
{/*/>*/}


          {/*<Stack direction="row" spacing={2}>*/}

          {/*  <Button variant="outlined" endIcon={<CalculateIcon />}>*/}
          {/*    Hesapla*/}
          {/*  </Button>*/}
          {/*</Stack>*/}


        </Box>
      </Modal>
    </div>
  );
}

export default App;
