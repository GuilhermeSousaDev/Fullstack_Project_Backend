import { container } from 'tsyringe';
import { IJwtProvider } from './models/IJwtProvider';
import JwtProvider from './implementations/JwtProvider';

container.registerSingleton<IJwtProvider>(
    'jwtProvider',
    JwtProvider,
); 