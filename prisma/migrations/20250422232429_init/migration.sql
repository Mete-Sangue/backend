-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipoSanguineo" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "telefone" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "doadorAtivo" BOOLEAN NOT NULL,
    "ultimaDoacao" TIMESTAMP(3),

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receptor" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "hospital" TEXT NOT NULL,
    "quantidade" TEXT NOT NULL,
    "documentoReceptor" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Receptor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Receptor_cpf_key" ON "Receptor"("cpf");
