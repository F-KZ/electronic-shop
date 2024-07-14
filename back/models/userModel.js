import { Schema, model } from 'mongoose';

import pkg from 'bcryptjs';
const { compare, genSalt, hash } = pkg;
// Définir le schéma de l'utilisateur
const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Méthode pour vérifier le mot de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

// Middleware pour hacher le mot de passe avant de sauvegarder
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

// Créer le modèle utilisateur
const User = model('User', userSchema);

export default User;
