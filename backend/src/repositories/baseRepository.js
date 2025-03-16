class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(options = {}) {
    return this.model.findAll(options);
  }

  async findById(id, options = {}) {
    return this.model.findByPk(id, options);
  }

  async findOne(conditions, options = {}) {
    return this.model.findOne({ where: conditions, ...options });
  }

  async create(data) {
    return this.model.create(data);
  }

  async update(id, data, options = {}) {
    const [affectedCount] = await this.model.update(data, {
      where: { id },
      ...options
    });
    return affectedCount > 0;
  }

  async delete(id) {
    const affectedCount = await this.model.destroy({
      where: { id }
    });
    return affectedCount > 0;
  }

  async bulkCreate(data, options = {}) {
    return this.model.bulkCreate(data, options);
  }

  async bulkUpdate(where, data, options = {}) {
    const [affectedCount] = await this.model.update(data, {
      where,
      ...options
    });
    return affectedCount;
  }

  async bulkDelete(where, options = {}) {
    return this.model.destroy({
      where,
      ...options
    });
  }

  // Transaction methods
  async transaction(callback) {
    return this.model.sequelize.transaction(callback);
  }
}

export default BaseRepository; 