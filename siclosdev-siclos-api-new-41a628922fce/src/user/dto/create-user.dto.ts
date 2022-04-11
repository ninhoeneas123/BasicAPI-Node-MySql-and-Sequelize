import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CpfIsUnique } from 'src/utils /pipes/cpf-unique.validator';
import { CpfIsValid } from 'src/utils /pipes/cpf-validation.validator';
import { EmailIsUnique } from 'src/utils /pipes/email-unique.validator';
import { InssIsUnique } from 'src/utils /pipes/inss-unique.validator';
import { MatriculaIsUnique } from 'src/utils /pipes/matricula-unique.validator';
import { PasswordIsValid } from 'src/utils /pipes/password-validation.validator';
import { RgIsUnique } from 'src/utils /pipes/rg-unique.vallidator';


export class CreateUserDto {


  @Expose()
  @ApiProperty()
  localId: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @CpfIsUnique({ message: " Este CPF já está em uso" })
  @CpfIsValid({ message: " O CPF deve coneter 11 digitos" })
  cpf: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo nome não pode ser vazio" })
  nome: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @PasswordIsValid({ message: "A senha deve conter no minimo 8 caracteres e pelo menos 1 letra maiúscula, 1 número, 1 caractere especial(@,#,$)" })
  senha: string;

  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo dataNascimento não pode ser vazio" })
  dataNascimento: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo nomePai não pode ser vazio" })
  nomePai: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo nomeMae não pode ser vazio" })
  nomeMae: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo logradouroRes não pode ser vazio" })
  logradouroRes: string;

  @IsNumber()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo numRes não pode ser vazio" })
  numRes: number;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo complementoRes não pode ser vazio" })
  complementoRes: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo bairroRes não pode ser vazio" })
  bairroRes: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo cepRes não pode ser vazio" })
  cepRes: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo cidadeRes não pode ser vazio" })
  cidadeRes: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo ufRes não pode ser vazio" })
  ufRes: string;

  @IsNumber()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo dddCel não pode ser vazio" })
  dddCel: number;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo telCel não pode ser vazio" })
  telCel: string;

  @IsNumber()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo dddRes não pode ser vazio" })
  dddRes: number;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo telRes não pode ser vazio" })
  telRes: String;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo email não pode ser vazio" })
  @EmailIsUnique({message:"O e-mail ja esta em uso"})
  email: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo sexo não pode ser vazio" })
  sexo: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo estadoCivil não pode ser vazio" })
  estadoCivil: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo nacionalidade não pode ser vazio" })
  nacionalidade: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo naturalidade não pode ser vazio" })
  naturalidade: string;

  @IsNumber()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo numDependentes não pode ser vazio" })
  numDependentes: number;

  @IsString()
  @Expose()
  @ApiProperty()
  @RgIsUnique({ message: "O numero da identidade ja esta cadastrado no nosso sistema!" })
  identidade: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo orgaoIdent não pode ser vazio" })
  orgaoIdent: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo ufIdent não pode ser vazio" })
  ufIdent: string;

  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo dataEmissaoIdent não pode ser vazio" })
  dataEmissaoIdent: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo empresa não pode ser vazio" })
  empresa: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo logradouroTrab não pode ser vazio" })
  logradouroTrab: string;

  @IsNumber()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo numeroTrab não pode ser vazio" })
  numeroTrab: number;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo complementoTrab não pode ser vazio" })
  complementoTrab: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo bairroTrab não pode ser vazio" })
  bairroTrab: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo cepTrab não pode ser vazio" })
  cepTrab: String;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo cidadeTrab não pode ser vazio" })
  cidadeTrab: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo ufTrab não pode ser vazio" })
  ufTrab: string;

  @IsNumber()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo dddTrab não pode ser vazio" })
  dddTrab: number;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo telTrab não pode ser vazio" })
  telTrab: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo cargo não pode ser vazio" })
  cargo: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo empresaId não pode ser vazio" })
  @IsMongoId()
  empresaId: string;


  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo setor não pode ser vazio" })
  setor: string;

  @IsNumber()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo matricula não pode ser vazio" })
  @MatriculaIsUnique({message:" Já existe um usuario cadastrado com essa matrícula da empresa"})
  matricula: number;

  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo dataAdmissao não pode ser vazio" })
  dataAdmissao: string;

  @IsNumber()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo salario não pode ser vazio" })
  salario: number;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo banco não pode ser vazio" })
  banco: string;

  @IsNumber()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo agencia não pode ser vazio" })
  agencia: number;

  @IsNumber()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo contaCorrente não pode ser vazio" })
  contaCorrente: number;

  @IsNumber()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo tpConta não pode ser vazio" })
  tpConta: number;

  @IsNumber()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo inss não pode ser vazio" })
  @InssIsUnique({message: "O número do INSS ja esta em uso"})
  inss: number;

  @IsNumber()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo ir não pode ser vazio" })
  ir: number;

  @IsNumber()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo contribuicaoSindical não pode ser vazio" })
  contribuicaoSindical: number;

  @IsNumber()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo emprestimo não pode ser vazio" })
  emprestimo: number;

  @IsNumber()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo valorConsig não pode ser vazio" })
  valorConsig: number;

  @IsNumber()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo cobrancasJudiciais não pode ser vazio" })
  cobrancasJudiciais: number;

  @IsNumber()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo pensaoAlimenticia não pode ser vazio" })
  pensaoAlimenticia: number;

  @IsNumber()
  @Expose()
  @ApiProperty()
  @IsNotEmpty({ message: " O campo outrosDescontos não pode ser vazio" })
  outrosDescontos: number;
}
