import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { MailerService } from "./mailer.service";

@Controller('mailer')
export class MailerController {
  constructor(private mailerService: MailerService) {}
  @Post('/content-created')
  async contentCreated(@Req() req, @Res() res) {
    try {
      await this.mailerService.contentEmail(
        req.body.content,
        req.body.email,
        req.body.name,
      );
      res.send({ status: 'ok' });
    } catch (e) {
      console.log(e);
      res.status(400).send({ error: 'Something went wrong' });
    }
  }
}
