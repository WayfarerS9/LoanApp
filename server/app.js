import express from 'express';
import cors from 'cors';
import fs from 'fs';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_Secret = 'my_secret_key';

const generateAccessToken = (id, name, secondName, telNum) => {
    const payload = {
        id: id,
        name: name,
        secondName: secondName,
        telNum: telNum,
    }
    return jwt.sign(payload, JWT_Secret, {expiresIn: 60 * 60 * 60});
}

function authMiddleware(req, res, next) {

    try {
        const token = req.headers['authorization'].split(' ')[1];

        if(!token) {
            return res.status(403).json({ message: 'Unauthorizated user' })
        }
        const decodedData = jwt.verify(token, JWT_Secret);
        req.user = decodedData;
        next();

    } catch (e) {
        return res.status(403).json({ message: 'Unauthorizated user' });
    }
}

app.post('/reg', async (req, res) => {

    const userName = req.body.name;
    const userSecondName = req.body.secondName;
    const telNum = req.body.telNum;
    let ghost = req.body.ghost;

    let data = await fs.promises.readFile('users.json', "utf8");
    let users = JSON.parse(data);
    let isUserFind = false;

    if(!userName || !userSecondName || !telNum) {
        res.status(400).send({message: 'You must fill in all the registration fields.'});
        isUserFind = true;
    }

    for (let user of users) {

        if(user.telNum === telNum && user.ghost === false) {
            res.status(400).send({message: 'The user with such a phone number is already registered in the system. You should go through the authentication procedure.'});
            isUserFind = true;
            break;
        }

        if(user.telNum === telNum && user.ghost === true) {
            user.ghost = false;
            data = JSON.stringify(users);
            await fs.promises.writeFile("users.json", data);
            await fs.promises.mkdir(`profiles/${user.id}/`, { recursive: true });
            await fs.promises.writeFile(`profiles/${user.id}/contacts.json`, '[]');
            res.status(200).send({message: 'Someone has already registered you in the system as a ghost profile. The status of your profile has been changed to the real one.'});
            isUserFind = true;
            break;
        }
    };

    if(!isUserFind) {
        let id = users.length + 1;
        let user = {
            id: id,
            name: userName,
            secondName: userSecondName,
            telNum: telNum,
            ghost: ghost
        };

        users.push(user);
        data = JSON.stringify(users);

        await fs.promises.writeFile("users.json", data);
        await fs.promises.mkdir(`profiles/${id}/`, { recursive: true });
        await fs.promises.writeFile(`profiles/${id}/contacts.json`, '[]');

        res.send({message: 'Registration was successful. Click "OK" and authenticate to continue working with the application.'});
    }
});

app.post('/regGhost', authMiddleware, async (req, res) => {

    const newUserName = req.body.name;
    const newUserSecondName = req.body.secondName;
    const newUserTelNum = req.body.telNum;
    const newUserStatus = req.body.ghost;

    let listOfUsersJSON = await fs.promises.readFile('users.json', "utf8");
    let listOfUsersParsed = JSON.parse(listOfUsersJSON);
    let isNewUserFind = false;

    if(!newUserName || !newUserSecondName || !newUserTelNum) {
        res.status(400).send({message: 'You must fill in all the registration fields.'});
        isUserFind = true;
    }

    for (let user of listOfUsersParsed) {

        if(user.telNum === newUserTelNum) {
            res.status(400).send({message: 'The user with such a phone number is already registered in the system.'});
            isNewUserFind = true;
            break;
        }
    }

    if(!isNewUserFind) {
        const idOfNewUser = listOfUsersParsed.length + 1;
        const newUser = {
            id: idOfNewUser,
            name: newUserName,
            secondName: newUserSecondName,
            telNum: newUserTelNum,
            ghost: newUserStatus
        };
        listOfUsersParsed.push(newUser);
        listOfUsersJSON = JSON.stringify(listOfUsersParsed);
        await fs.promises.writeFile("users.json", listOfUsersJSON);

        const idOfNewContact = idOfNewUser;
        const idOfUser = req.user.id;
        let userContactsListJSON = await fs.promises.readFile(`profiles/${idOfUser}/contacts.json`, "utf8");
        let userContactsListParsed = JSON.parse(userContactsListJSON);
        userContactsListParsed.push(idOfNewContact);
        userContactsListJSON = JSON.stringify(userContactsListParsed);
        await fs.promises.writeFile(`profiles/${idOfUser}/contacts.json`, userContactsListJSON);

        res.send({message: `You've just registered a new ghost profile of ${newUserName} ${newUserSecondName}. This person has been added to your contacts list.`});
    }
});

app.post('/auth', async (req, res) => {

    let isRegistrated = false;
    let user = req.body;
    let data = JSON.parse(await fs.promises.readFile('users.json', "utf8"));
    let id;

    for(let el of data) {

        if(el.telNum === user.telNum) {

            if(el.name === user.name) {

                if(el.secondName === user.secondName && el.ghost == false) {
                    isRegistrated = true;
                    id = el.id;
                    break;
                }
            }
        }
    }

    if (isRegistrated) {
        let token = generateAccessToken(id, user.name, user.secondName, user.telNum,);
        res.status(200).send({
            message: `You are logged in as ${user.name} ${user.secondName} .Welcome!`,
            token: `Bearer ${token}`
        });
    } else {
        res.status(401).send({
            message: 'Registration required!'
        });
    }
});


app.get('/usersSearch', async (req, res) => {

    const content = await fs.promises.readFile('users.json', 'utf8');
    const data = JSON.parse(content);

    const name = req.query.name;
    const arrName = name.split('');
    let arrNameNormalize = [];
    for(let i = 0; i < arrName.length; i++) {
        if(i==0) {
            arrNameNormalize.push(arrName[i].toUpperCase())
        } else {
            arrNameNormalize.push(arrName[i].toLowerCase())
        }
    }
    const nameForSearch = arrNameNormalize.join('');

    const secondName = req.query.secondName;
    const arrSecondName = secondName.split('');
    let arrSecondNameNormalize = [];

    for(let i = 0; i < arrSecondName.length; i++) {
        if(i==0) {
            arrSecondNameNormalize.push(arrSecondName[i].toUpperCase())
        } else {
            arrSecondNameNormalize.push(arrSecondName[i].toLowerCase())
        }
    }
    const secondNameForSearch = arrSecondNameNormalize.join('');

    const telNum = '+375' + req.query.telNum;

    const sendingData = data.filter( user => {

        if(
            nameForSearch.length > 2 ||
            secondNameForSearch.length > 2 ||
            telNum.length > 5
        ) {

            if(
                user.name.startsWith(nameForSearch) &&
                user.secondName.startsWith(secondNameForSearch) &&
                user.telNum.startsWith(telNum)
            ) {
                return true
            }
        }
    });

    res.send(sendingData);
})

app.get('/user/:id', authMiddleware, async (req, res) => {

    const id = req.params.id;

    const content = await fs.promises.readFile('users.json', 'utf8');
    const users = JSON.parse(content);
    let user = null;

    for (let el of users) {

        if (el.id == id) {
            user = el;
            break;
        }
    }

    res.send(user);
})

app.get('/loan/:id', authMiddleware, async (req, res) => {

    const id = req.params.id;
    const content = await fs.promises.readFile('loans.json', 'utf8');
    const loans = JSON.parse(content);
    let loan = [];

    for (let el of loans) {

        if (el.loanID == id) {
            loan = el;
            break;
        }
    }

    res.send(loan);
})

app.post('/addToContacts', authMiddleware, async (req, res) => {
    const idOfNewContact = req.body.id;
    const idOfUser = req.user.id;
    let userContactsJSON = await fs.promises.readFile(`profiles/${idOfUser}/contacts.json`, "utf8");
    let userContactsParse = JSON.parse(userContactsJSON);
    let isInContacts = false;
    let isUserHimself = idOfUser === idOfNewContact;

    if(isUserHimself) {
        res.send({message: `You cant't add yourself in the list of your contacts.`});
    } else {

        for(let contact of userContactsParse) {

            if(idOfNewContact === contact) {
                res.send({message: `This user is already in list of your contacts.`});
                isInContacts = true;
                break;
            }
        };

        if(!isInContacts && !isInContacts) {
            userContactsParse.push(idOfNewContact);
            userContactsJSON = JSON.stringify(userContactsParse);
            await fs.promises.writeFile(`profiles/${idOfUser}/contacts.json`, userContactsJSON);
            res.send({message: `User ${req.body.name} ${req.body.secondName} was added in the list of your contacts.`});
        }
    }
});

app.get('/contacts', authMiddleware, async (req, res) => {
    const idOfUser = req.user.id;
    const data = await fs.promises.readFile(`profiles/${idOfUser}/contacts.json`, 'utf8');
    const arrayOfIdOfContacts = JSON.parse(data);
    const data2 = await fs.promises.readFile('users.json', 'utf8');
    const users = JSON.parse(data2);
    let arrayOfContacts = [];

    for(let idOfContact of arrayOfIdOfContacts) {

        for(let user of users) {

            if(idOfContact === user.id) {
                arrayOfContacts.push(user)
                break;
            }
        }
    }

    res.send(arrayOfContacts);
})

app.get('/loans', authMiddleware, async (req, res) => {
    const idOfUser = req.user.id;
    const arrayOfLoansJSON = await fs.promises.readFile(`loans.json`, 'utf8');
    const arrayOfLoansParse = JSON.parse(arrayOfLoansJSON);
    let arrayOfLoans = [];

    for(let loan of arrayOfLoansParse) {

        if(loan.creditorID == idOfUser || loan.debtorID == idOfUser) {
            arrayOfLoans.push(loan)
        }
    }

    res.send(arrayOfLoans);
})

app.get('/creditLoans/:id', authMiddleware, async (req, res) => {
    const contactId = Number(req.params.id);
    const idOfUser = req.user.id;

    const arrayOfLoansJSON = await fs.promises.readFile(`loans.json`, 'utf8');
    const arrayOfLoansParse = JSON.parse(arrayOfLoansJSON);
    let arrayOfCreditLoans = [];

    for(let loan of arrayOfLoansParse) {

        if(loan.creditorID == contactId && loan.debtorID == idOfUser) {
            arrayOfCreditLoans.push(loan)
        }
    }

    res.send(arrayOfCreditLoans);
})


app.get('/debtLoans/:id', authMiddleware, async (req, res) => {
    const contactId = Number(req.params.id);
    const idOfUser = req.user.id;

    const arrayOfLoansJSON = await fs.promises.readFile(`loans.json`, 'utf8');
    const arrayOfLoansParse = JSON.parse(arrayOfLoansJSON);
    let arrayOfDebtLoans = [];

    for(let loan of arrayOfLoansParse) {

        if(loan.creditorID == idOfUser && loan.debtorID == contactId) {
            arrayOfDebtLoans.push(loan)
        }
    }

    res.send(arrayOfDebtLoans);
})


app.get('/creditors', authMiddleware, async (req, res) => {
    const idOfUser = req.user.id;

    const arrayOfLoansJSON = await fs.promises.readFile(`loans.json`, 'utf8');
    const arrayOfLoansParse = JSON.parse(arrayOfLoansJSON);
    let arrayOfCreditLoans = [];

    for(let loan of arrayOfLoansParse) {

        if(loan.debtorID == idOfUser) {
            arrayOfCreditLoans.push(loan)
        }
    }

    res.send(arrayOfCreditLoans);
})

app.get('/debitors', authMiddleware, async (req, res) => {
    const idOfUser = req.user.id;

    const arrayOfLoansJSON = await fs.promises.readFile(`loans.json`, 'utf8');
    const arrayOfLoansParse = JSON.parse(arrayOfLoansJSON);
    let arrayOfCreditLoans = [];

    for(let loan of arrayOfLoansParse) {

        if(loan.creditorID == idOfUser) {
            arrayOfCreditLoans.push(loan)
        }
    }

    res.send(arrayOfCreditLoans);
})

app.get('/balanceSumm', authMiddleware, async (req, res) => {
    const idOfUser = req.user.id;

    const arrayOfLoansJSON = await fs.promises.readFile(`loans.json`, 'utf8');
    const arrayOfLoansParse = JSON.parse(arrayOfLoansJSON);
    let summOfDebt = 0;
    let summOfCred = 0;


    for(let loan of arrayOfLoansParse) {

        if(loan.creditorID == idOfUser) {
            summOfDebt += loan.amount;
        }

        if(loan.debtorID == idOfUser) {
            summOfCred += loan.amount;
        }
    }

    let balance = summOfDebt - summOfCred;

    res.send({summOfbalance: balance});
})

app.get('/balanceSummOfContact/:id', authMiddleware, async (req, res) => {
    const contactId = Number(req.params.id);
    const idOfUser = req.user.id;

    const arrayOfLoansJSON = await fs.promises.readFile(`loans.json`, 'utf8');
    const arrayOfLoansParse = JSON.parse(arrayOfLoansJSON);
    let summOfDebt = 0;
    let summOfCred = 0;

    for(let loan of arrayOfLoansParse) {

        if(loan.creditorID == idOfUser && loan.debtorID == contactId) {
            summOfDebt += loan.amount;
        }

        if(loan.creditorID == contactId && loan.debtorID == idOfUser) {
            summOfCred += loan.amount;
        }
    }

    let balance = summOfDebt - summOfCred;

    res.send({summOfbalance: balance});
})

app.post('/createLoan', authMiddleware, async (req, res) => {
    let infAboutLoansJSON = await fs.promises.readFile(`loans.json`, "utf8");
    let infAboutLoansParse = JSON.parse(infAboutLoansJSON);
    let idOfLoan = infAboutLoansParse.length + 1;
    let createdLoan = req.body;
    createdLoan.loanID = idOfLoan;

    infAboutLoansParse.push(createdLoan)
    infAboutLoansJSON = JSON.stringify(infAboutLoansParse)

    await fs.promises.writeFile('loans.json', infAboutLoansJSON);

    if(req.body.amount > 0) {
        res.send({message: `A new loan was created.`});
    }

    if(req.body.amount < 0) {
        res.send({message: `The information about the repayment of the loan has been added.`});
    }
});




app.get('/getAllDebts', authMiddleware, async (req, res) => {
    const idOfUser = req.user.id;
    const arrayOfLoansJSON = await fs.promises.readFile(`loans.json`, 'utf8');
    const arrayOfLoansParse = JSON.parse(arrayOfLoansJSON);

    let arrayOfPersonsLoansParse = arrayOfLoansParse.filter(
        loan => loan.creditorID == idOfUser || loan.debtorID == idOfUser
    )

    let arrayUniqueParties = []

    arrayOfPersonsLoansParse.map( (el) => {

        if(el.creditorID != idOfUser && el.foot != 'Debt repayment') {
            el.amount = el.amount - 2*el.amount
        }

        if(el.foot == 'Debt repayment' && el.debtorID == idOfUser) {
            el.amount = Math.abs(el.amount)
        }

        if(el.creditorID == idOfUser) {
            el.counterpartyID = el.debtorID;
            el.counterpartyData = el.debtorData;
        } else {
            el.counterpartyID = el.creditorID;
            el.counterpartyData = el.creditorData;
        }

        if(checkUnique (el.counterpartyID)) {
            arrayUniqueParties.push(el)
        }
    })

    arrayUniqueParties.map( (el) => {
        let res = 0

            arrayOfPersonsLoansParse.forEach( (element) => {
                if(el.counterpartyID == element.counterpartyID) {

                    res += element.amount
                }
            })
        el.amount = res
    })

    function checkUnique (item) {
        let result = true
        arrayUniqueParties.forEach(element => {
            if(element.counterpartyID == item) {
                result = false
            }
        });

        return result
    }

    res.send(arrayUniqueParties);
})



app.listen(3000, function(){
    console.log("app is served on the port: 3000");
});