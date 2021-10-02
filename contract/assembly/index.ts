import { context, logging, storage,PersistentMap } from 'near-sdk-as'

const DEFAULT_MESSAGE = 'Hello'

// Exported functions will be part of the public interface for your smart contract.
// Feel free to extract behavior to non-exported functions!
export function getGreeting(accountId: string): string | null {
  // This uses raw `storage.get`, a low-level way to interact with on-chain
  // storage for simple contracts.
  // If you have something more complex, check out persistent collections:
  // https://docs.near.org/docs/concepts/data-storage#assemblyscript-collection-types
  return storage.get<string>(accountId, DEFAULT_MESSAGE)
}

export function setGreeting(message: string): void {
  const account_id = context.sender

  // Use logging.log to record logs permanently to the blockchain!
  logging.log(
    // String interpolation (`like ${this}`) is a work in progress:
    // https://github.com/AssemblyScript/assemblyscript/pull/1115
    'Saving greeting "' + message + '" for account "' + account_id + '"'
  )

  storage.set(account_id, message)
}

storage.set<number>("vote1",0);
storage.set<number>("vote2",0);

var a=1234;
export function ge():number{
  logging.log(a);
  return a
}
var user = new PersistentMap<string,string>("user");


export function Vote1():void{
  logging.log(user.getSome(context.sender).toString())
  if(user.get(context.sender, null)==null){
    let a = storage.getSome<number>("vote1")
    storage.set<number>("vote1",a++); 
    user.set(context.sender,"1");
  }
  //logging.log(context.sender+" voted "+user.get(context.sender))
}

export function Vote2():void{
  if(user.get(context.sender, null)==null){
    let a = storage.getSome<number>("vote2")
    storage.set<number>("vote2",a++); 
    user.set(context.sender,"1");
  }
}

export function getVote1():number{
  return storage.getSome<number>("vote1")
}

export function getVote2():number{
  return storage.getSome<number>("vote2")
}