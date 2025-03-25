import { readFile } from 'fs/promises';
import path from 'path';

const servicePath = path.resolve('data/json/services.json');

class serviceService {
  static async findServices() {
    try {
      const data = await readFile(servicePath, 'utf-8');
      const parsed = JSON.parse(data);
      return parsed.services || [];
    } catch (err) {
      return [];
    }
  }

  static async findServiceByTitle(title) {
    try {
      const services = await this.findServices();
      const service = services.find(s => s.title === title);
      return service || null;
    } catch (err) {
      return null;
    }
  }

  static mapServicesForCard(services) {
    return services.map(service => {
      return {
        title: service.title,
        shortDescription: service.shortDescription,
        image: service.image,
        };
    });
    }
}

export default serviceService;
