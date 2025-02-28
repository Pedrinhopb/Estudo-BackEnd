const Profile = require('../models/Profile');

// 📌 Criar um perfil (Create)
exports.createProfile = async (req, res) => {
    const { userId, bio, website } = req.body;

    try {
        const profile = new Profile({ user: userId, bio, website });
        await profile.save();
        res.status(201).json({ msg: 'Perfil criado com sucesso!', profile });
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao criar perfil', error });
    }
};

// 📌 Buscar perfil por ID do usuário (Read)
exports.getProfileByUserId = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.userId }).populate('user', 'name email');
        if (!profile) return res.status(404).json({ msg: 'Perfil não encontrado' });

        res.json(profile);
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao buscar perfil', error });
    }
};

// 📌 Atualizar um perfil (Update)
exports.updateProfile = async (req, res) => {
    try {
        const { bio, website } = req.body;
        const profile = await Profile.findOne({ user: req.params.userId });

        if (!profile) return res.status(404).json({ msg: 'Perfil não encontrado' });

        profile.bio = bio || profile.bio;
        profile.website = website || profile.website;

        await profile.save();
        res.json({ msg: 'Perfil atualizado!', profile });
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao atualizar perfil', error });
    }
};

// 📌 Deletar um perfil (Delete)
exports.deleteProfile = async (req, res) => {
    try {
        await Profile.findOneAndDelete({ user: req.params.userId });
        res.json({ msg: 'Perfil deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao deletar perfil', error });
    }
};
