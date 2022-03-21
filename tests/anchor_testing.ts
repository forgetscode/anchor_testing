import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { AnchorTesting } from '../target/types/anchor_testing';


describe('anchor_testing', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.AnchorTesting as Program<AnchorTesting>;

  const user= program.provider.wallet;

  const myAccount = anchor.web3.Keypair.generate();


  it('Is initialized!', async () => {

    // Add your test here.

    let _balance = await program.provider.connection.getBalance(user.publicKey);

    let test_length = "hello my name is fredrick, I am from norway! I am going to write a long essay for you to demonstrate my exceptional capabilities as a writer. I am the best writer in the world as you can tell which is why I have so much to say! It is truely apparent from the musings of my brain that my writing has characteristics that far surpass the average genius!";

    const tx = await program.rpc.initialize(test_length, {
      accounts: {
        myAccount: myAccount.publicKey,
        user: user.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      },
      signers: [myAccount],
    });

    let _balanceInit = await program.provider.connection.getBalance(user.publicKey);
    console.log("cost of initialization: $", (_balance* (10**-9) - _balanceInit* (10**-9))*90);

    let _myAccountData = await program.account.myAccount.fetch(myAccount.publicKey);
    console.log(_myAccountData);

    console.log("Your transaction signature", tx);

    let _myAccount = await program.account.myAccount.fetch(myAccount.publicKey);
    console.log(_myAccount.data);

    let test_longer_length = "trivial change"

    const tx2 = await program.rpc.update(test_longer_length, {
      accounts: {
        myAccount: myAccount.publicKey,
      }
    });

    let _balanceUpdate = await program.provider.connection.getBalance(user.publicKey);
    console.log("cost of update: $", (_balanceInit* (10**-9) - _balanceUpdate* (10**-9))*90);

    let _myAccountDataNew = await program.account.myAccount.fetch(myAccount.publicKey);
    console.log(_myAccountDataNew);

    console.log("Your transaction signature", tx2);

  });
});
