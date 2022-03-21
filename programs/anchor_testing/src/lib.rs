use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod anchor_testing {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, data: String) -> ProgramResult {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = data;
        Ok(())
    }

    pub fn update(ctx: Context<Update>, data: String) -> ProgramResult {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = data;
        Ok(())
    }
}



#[derive(Accounts)]
#[instruction(text: String)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = MyAccount::space(&text))]
    pub my_account: Account<'info, MyAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

impl MyAccount {
    fn space(text: &str) -> usize {
        // discriminator
        8 +
        // u8 + u16 + u32 + u64 + u128
        1 + 2 + 4 + 8 + 16 +
        // i8 + i16 + i32 + i64 + i128
        1 + 2 + 4 + 8 + 16 +
        // bool + char
        1 + 4 +
        // String
        4 + text.len()
    }
}


#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

#[derive(Accounts)]
pub struct Delete<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

#[account]
pub struct MyAccount {
    pub data: String,
}

