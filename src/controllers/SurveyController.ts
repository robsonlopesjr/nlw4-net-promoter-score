import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';

class SurveyController {
  async create(request: Request, response: Response) {
    const {title, description} = request.body;

    const surveyRepository = getCustomRepository(SurveyRepository);

    const surveyAlreadyExists = await surveyRepository.findOne({title});

    if (surveyAlreadyExists) {
      return response.status(400).json({
        error: 'Survey already exists'
      })
    }

    const survey = surveyRepository.create({
      title,
      description
    });

    await surveyRepository.save(survey);

    return response.status(201).json(survey);
  }

  async show(request: Request, response: Response) {
    const surveyRepository = getCustomRepository(SurveyRepository);

    const surveys = await surveyRepository.find();

    return response.json(surveys);
  }
}

export { SurveyController };
