export function validateLink(schema) {
    return ((req, res, next) => {
        const { link } = req.body;
        const { error } = schema.validate({ link }, { abortEarly: false });
        const errorMessages = error?.details.map(ed => ed.message);
        if (errorMessages) return res.status(400).send(errorMessages);
        //acima verifica o token em sua estrutura
        next();
    });
}

export function validateDescription(schema) {
    return ((req, res, next) => {
        const { description } = req.body;
        const { error } = schema.validate({ description }, { abortEarly: false });
        const errorMessages = error?.details.map(ed => ed.message);
        if (errorMessages) return res.status(409).send(errorMessages);
        next();
    });
}