import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  //logistic
  logisticSystem(rMin:any, rMax:any, accuracy:any, reps:any, numtoplot:any): any {
    const data = [];
    const steps = Math.ceil((rMax - rMin) / accuracy);

    for (let i = 0; i <= steps; i++) {
      const r = rMin + i * accuracy;
      let x = Math.random();
      const results = this.logisticMap(x, r, reps);
      const plotData = results.slice(reps - numtoplot).map(x => ({ x: r, y: x }));
      data.push(...plotData);
    }
    return data;
  }
  
  logisticMap = (x:any, r:any, reps:any) => {
    let results = [];
    for (let i = 0; i < reps; i++) {
      x = r * x * (1 - x);
      results.push(x);
    }
    return results;
  };



  //lorenz
  lorenzSystem(x0:any, y0:any, z0:any, sigma:any, rho:any, beta:any, iterations:any, dt:any): any {
    let data = [];
    let x = x0, y = y0, z = z0;
    for (let i = 0; i < iterations; i++) {
      [x, y, z] = this.lorenzMap(x, y, z, sigma, rho, beta, dt);
      data.push([x, y, z]);
    }
    return data;
  }
  
  lorenzMap = (x:any, y:any, z:any, sigma:any, rho:any, beta:any, dt:any) => {
    let dx = sigma * (y - x);
    let dy = x * (rho - z) - y;
    let dz = x * y - beta * z;
    x += dx * dt;
    y += dy * dt;
    z += dz * dt;
    return [x, y, z];
  };



  //ikeda
  ikedaSystem(x0:any, y0:any, u:any, a:any, iterations:any): any {
    let data = [];
    let x = x0, y = y0;
    for (let i = 0; i < iterations; i++) {
      [x, y] = this.ikedaMap(x, y, u, a);
      data.push([x, y]);
    }
    return data;
  }

  ikedaMap = (x:any, y:any, u:any, a:any) => {
    const theta = 0.4 - (6 / (1 + x * x + y * y));
    const xNew = 1 + u * (x * Math.cos(theta) - y * Math.sin(theta));
    const yNew = u * (x * Math.sin(theta) + y * Math.cos(theta));
    return [xNew, yNew];
  };



  //vanDerPol
  vanDerPolSystem(x0:any, y0:any, mu:any, iterations:any, dt:any): any {
    let data = [];
    let x = x0, y = y0;
    for (let i = 0; i < iterations; i++) {
      [x, y] = this.vanDerPolMap(x, y, mu, dt);
      data.push([x, y]);
    }
    return data;
  }

  vanDerPolMap = (x:any, y:any, mu:any, dt:any) => {
    let dx = y;
    let dy = mu * (1 - x * x) * y - x;
    x += dx * dt;
    y += dy * dt;
    return [x, y];
  };

}
