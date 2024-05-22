import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("logistic")
  logisticSystem(@Req() req: any):any{

    const { rMin, rMax, accuracy, reps, numtoplot} = req.body;
    return this.appService.logisticSystem(rMin, rMax, accuracy, reps, numtoplot);
  
  }

  @Post("lorenz")
  lorenzSystem(@Req() req: any):any{

    const {x0, y0, z0, sigma, rho, beta, iterations, dt} = req.body;
    return this.appService.lorenzSystem(x0, y0, z0, sigma, rho, beta, iterations, dt);

  }

  @Post("ikeda")
  ikedaSystem(@Req() req: any):any{
    
    const {x0, y0, u, a, iterations} = req.body;
    return this.appService.ikedaSystem(x0, y0, u, a, iterations);

  }

  @Post("vanderpol")
  vanDerPolSystem(@Req() req: any):any{
    
    const {x0, y0, mu, iterations, dt} = req.body;
    return this.appService.vanDerPolSystem(x0, y0, mu, iterations, dt);

  }
}
