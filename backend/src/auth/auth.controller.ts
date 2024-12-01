import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@ApiTags('Authentication') // Group endpoints under 'Authentication'
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiBody({
    description: 'User registration data',
    type: AuthCredentialsDto,
  })
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Sign in an existing user' })
  @ApiResponse({ 
    status: 200, 
    description: 'User successfully signed in',
    schema: {
      example: { accessToken: 'eyJhbGciOiJIUzI1...' },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiBody({
    description: 'User login data',
    type: AuthCredentialsDto,
  })
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
