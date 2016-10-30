/**
 * Created by Volkov on 30.10.2016.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  isActive: { type: 'Boolean', required: false, default: true }
});

export default mongoose.model('Game', gameSchema);
