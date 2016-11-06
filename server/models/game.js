/**
 * Created by Volkov on 30.10.2016.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  status: { type: 'String', required: false, default: '0:0' },
  isActive: { type: 'Boolean', required: false, default: true },
  comments: []
});

export default mongoose.model('Game', gameSchema);
