/**
 * Created by Volkov on 30.10.2016.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  gameCuid: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  value: { type: 'String', required: true }
});

export default mongoose.model('Comment', commentSchema);
